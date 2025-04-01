<script lang="ts">
    import { createDeck, getGameRecord, setGameRecord } from './game-utils';
    import type { CardData, GameRecord } from './game-utils';
    import Card from "./Card.svelte";
    import { scale } from 'svelte/transition';
    import { confetti } from '@neoconfetti/svelte';

    let { size, onGameReset } = $props();

    let elapsed = $state(0);
    let mins = $derived(elapsed / 60 | 0);
    let secs = $derived(elapsed % 60);
    let elapsedStr = $derived(`${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`);
    let steps = $state(0);
    let deck = $state(createDeck(size));
    let foundCards = $state(0);
    let won = $derived((foundCards == deck.length) ? true : false);
    let newRecord = $derived.by(() => {
        if (!won) return false;

        const record: GameRecord | null = getGameRecord(size);

        if (record === null || (elapsed < record.elapsed && steps < record.steps)) {
            setGameRecord(size, elapsed, elapsedStr, steps);
            return true;
        }
        return false;
    });
    let gameRecord = getGameRecord(size);

    const selectedCards: CardData[] = [];

    function onCardClicked(index: number) {
        const clickedCard = deck[index];

        if (clickedCard.flipped || selectedCards.length == 2) return;

        steps++;
        clickedCard.flipped = true;
        selectedCards.push(clickedCard);

        if (selectedCards.length == 2) {
            if (selectedCards[0].symbol !== selectedCards[1].symbol) {
                setTimeout(() => {
                    selectedCards.forEach(card => {
                        card.flipped = false;
                    });
                    selectedCards.splice(0, selectedCards.length);
                }, 1000);
            } else {
                foundCards += 2;
                selectedCards.splice(0, selectedCards.length);
            }
        }
    }

    $effect(() => {
        const interval = setInterval(() => {
            if (!won) elapsed++;
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    });
</script>

<div class="game">
    <aside class="stats">
        {#if gameRecord}
            <h2>🏅 {gameRecord.steps} steps in {gameRecord.elapsedStr}</h2>
        {/if}
        <h2>Time: {elapsedStr}</h2>
        <h2>Steps: {steps}</h2>
        {#if won}
            <h1 transition:scale>You won!</h1>
            {#if newRecord}
                <h3 transition:scale>🏆 New record! 🏆</h3>
            {/if}
            <button transition:scale class="action" onclick={ onGameReset }>Return to title</button>
        {/if}
    </aside>
    <main class="deck">
        {#each deck as card, index}
            <Card {...card} {index} clickHandler={onCardClicked}/>
        {/each}
    </main>
    {#if won}
        <div
            style="position: absolute; left: 50%; top: 30%;"
            use:confetti={{
                force: 0.7,
                duration: 3000,
                stageWidth: window.innerWidth,
			    stageHeight: window.innerHeight,
                colors: ['#61e882', '#ec9f5c', '#f2cde8']
            }}
        ></div>
    {/if}
</div>

<style>
    aside {
        min-width: 220px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        margin: 0 5rem;
    }
    h1 {
        font-family: "Chicle", serif;
        font-weight: 400;
        font-style: normal;
        font-size: 3.5rem;
        align-self: center;
        margin: 2rem 0;
    }
    h2 {
        color: #ec9f5c;
    }
    h3 {
        margin: 0 0 2rem;
        align-self: center;
    }
    .game {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .deck {
        display: grid;
        grid-template: repeat(var(--size), 1fr) / repeat(var(--size), 1fr);
        grid-gap: 20px;
        height: 85vh;
        width: 85vh;
        margin: 0 auto;
        padding: 20px;
    }
</style>
