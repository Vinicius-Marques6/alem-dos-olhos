<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';

  export let photos: {
    url: string;
    title: string;
    description: string;
  }[] = [];

  let actual = 0;
  let interval: ReturnType<typeof setInterval>;

  const nextPhoto = () => {
    actual = actual === photos.length - 1 ? 0 : actual + 1;
  };

  const previousPhoto = () => {
    actual = actual === 0 ? photos.length - 1 : actual - 1;
  };

  const goToPhoto = (index: number) => {
    actual = index;
  };

  onMount(() => {
    interval = setInterval(nextPhoto, 6000);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<div class="relative w-full h-[85vh] bg-black overflow-hidden group">
  
  {#each photos as photo, index (index)}
    <div 
      class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      class:opacity-100={index === actual}
      class:z-10={index === actual}
      class:opacity-0={index !== actual}
      class:z-0={index !== actual}
    >
      <div
        class="absolute inset-0 overflow-hidden scale-110"
        class:animate-kenburns={index === actual}
      >
        <img
          src={photo.url}
          alt=""
          class="absolute inset-0 w-full h-full object-cover filter blur -z-10"
          aria-hidden="true"
        />
        <img
          src={photo.url}
          alt={photo.title}
          class="absolute inset-0 w-full h-full object-contain ease-out"
        />
      </div>
      
      <div class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20"></div>
    </div>
  {/each}

  <div class="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20 flex flex-col items-start pointer-events-none">
    {#key actual} <div in:fade={{ duration: 700, delay: 200 }}>
        <h2 
          class="text-white text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg mb-2 transform transition-all duration-700 translate-y-0 opacity-100"
        >
          {photos[actual]?.title || ''}
        </h2>
        <p 
          class="text-gray-200 text-lg md:text-xl font-light tracking-wide drop-shadow-md border-l-2 border-white pl-2 transition-all duration-700 delay-100"
        >
          {photos[actual]?.description || ''}
        </p>
      </div>
    {/key}
  </div>

  <!-- svelte-ignore a11y_consider_explicit_label -->
  <button 
    on:click={previousPhoto}
    class="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  </button>

  <!-- svelte-ignore a11y_consider_explicit_label -->
  <button 
    on:click={nextPhoto}
    class="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  </button>

  <div class="absolute bottom-6 right-8 z-30 flex gap-3">
    {#each photos as _, idx}
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button
        on:click={() => goToPhoto(idx)}
        class="h-1 transition-all duration-500 rounded-full cursor-pointer"
        class:w-8={idx === actual}
        class:bg-white={idx === actual}
        class:w-2={idx !== actual}
        class:bg-white-50={idx !== actual} 
        style={idx !== actual ? 'background-color: rgba(255,255,255,0.5)' : ''} 
      ></button>
    {/each}
  </div>

</div>

<style>
  @keyframes kenburns {
    0% { transform: scale(1); }
    100% { transform: scale(1.1); }
  }

  .animate-kenburns {
    animation: kenburns 8s ease-out forwards;
  }
</style>