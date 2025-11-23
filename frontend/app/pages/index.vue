<template>
  <div class="home-page">
    <SliderProduct />
    <CategorySection />
    <FeaturedProducts />
    <NewsletterSection />
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}
</style>