<script lang="ts">
  import Highlights from '$lib/components/Highlights.svelte';
  import MasonryGallery from '$lib/components/MasonryGallery.svelte';
  import BackToTop from '$lib/components/BackToTop.svelte';
  import PhotoModal from '$lib/components/PhotoModal.svelte';

  export let data; 
</script>

<div>
  <Highlights photos={data.highlights} />

  <div class="container mx-auto px-4 pt-16 pb-8">
    <h3 class="text-2xl font-light text-gray-800 uppercase tracking-widest border-b pb-4">
      Galeria Completa
    </h3>
  </div>

  <MasonryGallery initialPhotos={data.photos} />

  <BackToTop />

  <PhotoModal />
</div>