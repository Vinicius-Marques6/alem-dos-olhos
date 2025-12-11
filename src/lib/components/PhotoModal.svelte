<script lang="ts">
  import { fade } from 'svelte/transition';
  import { selectedPhoto } from '$lib/stores/photoStore';

  function close() {
    $selectedPhoto = null;
  }
</script>

{#if $selectedPhoto}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
    transition:fade={{ duration: 300 }}
    on:click|self={close}
  >
    
    <div class="relative max-w-5xl w-full h-full flex items-center justify-center pointer-events-none">
      
        <img 
          src={$selectedPhoto.url} 
          alt={$selectedPhoto.title}
          class="max-w-full max-h-[90vh] object-contain shadow-2xl pointer-events-auto"
        />

        <div class="absolute bottom-4 left-0 w-full text-center text-white pointer-events-auto" transition:fade={{ delay: 300 }}>
            <h3 class="text-xl font-bold">{$selectedPhoto.title}</h3>
            <p class="text-gray-300">{$selectedPhoto.creator}</p>
        </div>
    </div>

    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button 
      class="absolute top-4 right-4 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition cursor-pointer z-50"
      on:click={close}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

  </div>
{/if}