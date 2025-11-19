import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { uid } from 'uid';

const router = Router();
const EVENTS_FILE = path.join(__dirname, '../data/analytics-events.json');

type EventType = 'product_view' | 'add_to_cart' | 'search' | 'purchase';

interface TrackingEvent {
  id: string;
  eventType: EventType;
  sessionId?: string;
  page?: string;
  productId?: number;
  productName?: string;
  productPrice?: number;
  productCategory?: string;
  quantity?: number;
  cartValue?: number;
  searchTerm?: string;
  searchResults?: number;
  metadata?: Record<string, any>;
}

// Utilitaires de fichier
const readEvents = (): TrackingEvent[] => {
  if (!fs.existsSync(EVENTS_FILE)) {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify([], null, 2));
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf-8'));
  } catch {
    return [];
  }
};

const writeEvent = (event: TrackingEvent) => {
  const events = readEvents();
  events.push(event);
  fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2));
};

// Enregistrer un événement
router.post('/track', (req: Request, res: Response) => {
  try {
    const event: TrackingEvent = {
      id: uid(16),
      eventType: req.body.eventType,
      ...req.body
    };
    writeEvent(event);
    res.json({ success: true, eventId: event.id });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to track event' });
  }
});

// Récupérer les événements
router.get('/events', (req: Request, res: Response) => {
  try {
    let events = readEvents();
    const { eventType, productId } = req.query;

    if (eventType) events = events.filter(e => e.eventType === eventType);
    if (productId) events = events.filter(e => e.productId === Number(productId));

    res.json(events);
  } catch {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Fonction helper pour compter par clé
const countBy = <T>(items: T[], keyFn: (item: T) => string | number): Record<string, number> => {
  const counts: Record<string, number> = {};
  items.forEach(item => {
    const key = String(keyFn(item));
    counts[key] = (counts[key] || 0) + 1;
  });
  return counts;
};

// Fonction pour obtenir les top N éléments
const topN = (counts: Record<string, number>, n: number = 10) => {
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, n);
};

// Statistiques agrégées
router.get('/stats', (req: Request, res: Response) => {
  try {
    const events = readEvents();

    // Compteurs par type
    const eventsByType = countBy(events, e => e.eventType);

    // Top produits vus
    const productViews = countBy(
      events.filter(e => e.eventType === 'product_view' && e.productId),
      e => e.productId!
    );

    // Top produits ajoutés
    const productAdds: Record<string, number> = {};
    events
      .filter(e => e.eventType === 'add_to_cart' && e.productId)
      .forEach(e => {
        const key = String(e.productId);
        productAdds[key] = (productAdds[key] || 0) + (e.quantity || 1);
      });

    // Top recherches
    const searchTerms = countBy(
      events.filter(e => e.eventType === 'search' && e.searchTerm),
      e => e.searchTerm!.toLowerCase()
    );

    // Top produits achetés
    const productPurchases: Record<string, number> = {};
    events
      .filter(e => e.eventType === 'purchase' && e.metadata?.items)
      .forEach(e => {
        const items = e.metadata?.items;
        if (Array.isArray(items)) {
          items.forEach((item: any) => {
            if (item.productId) {
              const key = String(item.productId);
              productPurchases[key] = (productPurchases[key] || 0) + (item.quantity || 1);
            }
          });
        }
      });

    // Métriques de conversion
    const totalViews = events.filter(e => e.eventType === 'product_view').length;
    const totalAdds = events.filter(e => e.eventType === 'add_to_cart').length;
    const totalPurchases = events.filter(e => e.eventType === 'purchase').length;


    // On fait la différence entre les vues du produit et les ajouts au panier
    const conversionRate = totalViews > 0 ? ((totalAdds / totalViews) * 100).toFixed(2) : '0.00';
    // On fait la différence entre les ajouts au panier et les achats
    const finalConversionRate = totalAdds > 0 ? ((totalPurchases / totalAdds) * 100).toFixed(2) : '0.00';

    // Valeurs totales
    const totalCartValue = events
      .filter(e => e.eventType === 'add_to_cart' && e.cartValue)
      .reduce((sum, e) => sum + (e.cartValue || 0), 0);
    
    const totalPurchaseValue = events
      .filter(e => e.eventType === 'purchase' && e.cartValue)
      .reduce((sum, e) => sum + (e.cartValue || 0), 0);

    res.json({
      totalEvents: events.length,
      eventsByType,
      topProductViews: topN(productViews).map(([id, count]) => ({ productId: Number(id), views: count })),
      topProductAdds: topN(productAdds).map(([id, count]) => ({ productId: Number(id), adds: count })),
      topProductPurchases: topN(productPurchases).map(([id, count]) => ({ productId: Number(id), purchases: count })),
      topSearchTerms: topN(searchTerms).map(([term, count]) => ({ term, searches: count })),
      conversionRate: `${conversionRate}%`,
      finalConversionRate: `${finalConversionRate}%`,
      totalCartValue: totalCartValue.toFixed(2),
      totalPurchaseValue: totalPurchaseValue.toFixed(2),
      totalPurchases
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;

