<script>
    // Declare a boolean variable to hold the state
    let { name, isDisabled = false, isChecked = $bindable() } = $props(); // Default value
</script>

<div class="relative inline-block w-8 h-5">
    <input
        type="checkbox"
        id={name}
        bind:checked={isChecked}
        class="peer appearance-none w-8 h-5 bg-slate-100 rounded-full checked:bg-gray-600 dark:checked:bg-white dark:bg-stone-600 transition duration-300 {isDisabled
            ? ''
            : 'hover:shadow-sm'}"
        disabled={isDisabled}
    />
    <label
        for={name}
        class="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-3 peer-checked:border-slate-800"
    >
    </label>
</div>
