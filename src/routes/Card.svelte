<script lang="ts">
    let {symbol, flipped, index, clickHandler} = $props();
</script>

<button class="card" class:flipped onclick={() => clickHandler(index)}>
    <div class="inner">
        <div class="front">
            <div class="content">
                {symbol}
            </div>
        </div>
        <div class="back">
            <div class="content">&nbsp;</div>
        </div>
    </div>
</button>

<style>
    .card {
        font-family: "Chicle", serif;
        font-weight: 400;
        font-style: normal;
        font-size: 3rem;
        aspect-ratio: 1;
        user-select: none;
        cursor: pointer;
        perspective: 1000px;
        padding: 0;
        background: transparent;
        border: none;
    }
    .inner {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }
    .card.flipped .inner {
        transform: rotateY(180deg);
    }
    .front, .back {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #fff;
        backface-visibility: hidden;
        border: 1px solid #bbbbbb;
        border-radius: 10px;
    }
    .front {
        transform: rotateY(180deg);
    }
    .content {
        width: 90%;
        height: 90%;
        border-radius: 10px;
    }
    .front .content {
        background-color: #e6ffec;
    }
    .back .content {
        background-color: #e6ffec;
        background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2329ca50' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    .front, .back, .content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
</style>
