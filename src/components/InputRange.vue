<template>
    <div class="input-range">
        <div class="input-label">
            {{ inputSettings.label }}
        </div>
        <div class="input__wrapper">
            <input
                type="text"
                class="input__wrapper-value"
                :value="inputSettings.value.toLocaleString()"
                :disabled="percent"
                :min="slider.min"
                :max="slider.max"
                @change="$emit('change-value', { name: inputSettings.name, value: $event.target.value })"
            >
            <input
                v-if="percent"
                :value="`${percent}%`"
                type="text"
                class="input__wrapper-percent"
                @change="$emit('change-value', { name: inputSettings.name, value: $event.target.value.replace('%', '') })"
            >
            <div v-else class="input__wrapper-append">
            {{ inputSettings.append }}
            </div>

            <v-slider
                class="input__wrapper-slider"
                color="primary"
                track-color="secondary"
                :value="percent ?? inputSettings.value"
                :min="slider.min"
                :max="slider.max"
                @input="$emit('change-value', { name: inputSettings.name, value: $event })"
            />
        </div>
    </div>
</template>

<script>
  export default {
    name: 'InputRange',
    props: {
        inputSettings: {
            type: Object,
            required: true
        },
        slider: {
            type: Object,
            required:true
        },
        percent: {
            type: Number,
            default: null
        }
    },
  }
</script>
