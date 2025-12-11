<script lang="ts">
  import { fly } from 'svelte/transition';

  let y = 0;
  
  $: show = y > 500;

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<svelte:window bind:scrollY={y} />

{#if show}
  <button
    on:click={scrollToTop}
    aria-label="Back to top"
    transition:fly={{ y: 50, duration: 500 }} 
    class="fixed bottom-8 right-8 z-50 
           p-3 rounded-full shadow-2xl
           bg-black/70 text-white backdrop-blur-md border border-white/10
           transform transition-transform duration-300 ease-in-out
           hover:bg-black hover:scale-110 hover:shadow-blue-500/20
           cursor-pointer"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke-width="2.5" 
      stroke="currentColor" 
      class="w-6 h-6"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  </button>
{/if}