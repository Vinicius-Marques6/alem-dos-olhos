<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import { selectedPhoto, type Photo } from '$lib/stores/photoStore';

  type Photo = {
    id: string;
    url: string;
    title: string;
    creator: string;
  };

  export let initialPhotos: Photo[] = [];

  let photos = initialPhotos;
  let offset = 20;
  let loading = false;
  let hasMore = true;
  let numColumns = 1;
  let sentinel: HTMLDivElement; 

  $: columns = distributePhotos(photos, numColumns);

  function distributePhotos(items: Photo[], cols: number) {
    const result: Photo[][] = Array.from({ length: cols }, () => []);
    items.forEach((item, i) => result[i % cols].push(item));
    return result;
  }

  function updateColumns() {
    const width = window.innerWidth;
    if (width >= 1024) numColumns = 3;
    else if (width >= 768) numColumns = 2;
    else numColumns = 1;
  }

  async function fetchMorePhotos() {
    if (loading || !hasMore) return;
    loading = true;

    try {
      const res = await fetch(`/api/photos?offset=${offset}`);
      const newPhotos = await res.json();

      if (newPhotos.length === 0) {
        hasMore = false;
      } else {
        photos = [...photos, ...newPhotos];
        offset += 20;
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      loading = false;
    }
  };

  function openPhoto(photo: Photo) {
    $selectedPhoto = photo;
  }

  onMount(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMorePhotos();
      }
    }, { rootMargin: '200px' });

    if (sentinel) observer.observe(sentinel);

    return () => {
      window.removeEventListener("resize", updateColumns);
      observer.disconnect();
    };
  });
</script>

<div class="pb-10">
  <div class="flex gap-4 p-4 items-start transition-opacity duration-1000 ease-out opacity-100">
    {#each columns as column}
      <div class="flex-1 flex flex-col gap-4">
        {#each column as photo (photo.id)}
          <div 
            class="group relative overflow-hidden bg-gray-100"
            in:fade={{ duration: 500 }}
            on:click={() => openPhoto(photo)}
          >
            <img 
              src={photo.url} 
              alt={photo.title}
              class="w-full h-auto object-cover opacity-100"
              loading="lazy" 
            />

            <div class="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p class="text-white text-sm font-bold">{photo.title}</p>
              <p class="text-gray-300 text-sm">{photo.creator}</p>
            </div>
          </div>
        {/each}
      </div>
    {/each}
  </div>

  <div bind:this={sentinel} class="h-20 flex justify-center items-center w-full mt-4">
    {#if loading}
      <div class="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    {/if}
    {#if !hasMore}
      <p class="text-gray-500" in:fade>Você chegou ao fim.</p>
    {/if}
  </div>
</div>