<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import Game from './Game.svelte';

    let gameStarted = $state(false);
    let size = $state(4);

    function onGameReset() {
        gameStarted = false;
    }
</script>

<svelte:head>
    <title>MeMoMatch</title>
</svelte:head>

<div class="container">
    {#if !gameStarted}
        <a class="repo-link" target="_blank" href="https://github.com/rczy/memomatch" transition:fly={{x: 10, y: -10}}>
            <img src="/github-mark.svg" alt="GitHub Repository"/>
        </a>
        <div class="wrapper" transition:fly={{y: -200}}>
            <h1>MeMoMatch</h1>

            <h2>A memory cards game on a(n) <input type="number" min="2" max="10" bind:value={size} onkeydown={(e) => {e.preventDefault()}}> × {size} grid.</h2>

            <button class="action" onclick="{() => gameStarted = true}">Let's play!</button>
        </div>
    {:else}
        <div transition:fade>
            <Game {size} {onGameReset} --size={size}></Game>
        </div>
    {/if}
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Chicle&family=Roboto:wght@300&display=swap');

    :global(body) {
        background-color: #ffffff;
        background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ec9f5c' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
        display:flex;
        height:100vh;
        align-items:center;
        justify-content: center;
        margin: 0;
        overflow: hidden;
    }
    :global(body, button.action, input) {
        font-family: "Roboto", sans-serif;
        font-weight: 300;
        font-style: normal;
    }
    :global(button.action) {
        border: 4px solid #61e882;
        padding: 0.75rem 2.5rem;
        cursor: pointer;
        background-color: white;
        font-size: 1.2rem;
        transition: scale 0.3s ease-in-out;
        scale: 0.95;
    }
    :global(button.action:hover) {
        scale: 1;
    }
    .container {
        display: grid;
    }
    .container > * {
        grid-area: 1 / 1;
    }
    h1 {
        font-family: "Chicle", serif;
        font-weight: 400;
        font-style: normal;
        font-size: 5rem;
        margin-bottom: 0;
        padding: 0 1rem;
        background: linear-gradient(120deg, #61e882, #ec9f5c);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    h2 {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 2rem 0 2rem;
        color: #ec9f5c;
    }
    input[type="number"] {
        font-size: 1.4rem;
        text-align: center;
    }
    a.repo-link {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
    a.repo-link img {
        width: 2.5rem;
        transform: rotate(15deg);
        opacity: 0.3;
        transition: all 0.3s;
    }
    a.repo-link:hover img {
        opacity: 1;
        transform: rotate(0);
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20vh;
    }
</style>