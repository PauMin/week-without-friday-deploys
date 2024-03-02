export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('click-outside', {
        beforeMount(el, binding) {
            el.clickOutsideEvent = function (event: MouseEvent) {
                if (!(el === event.target || el.contains(event.target))) {
                    binding.value(event, el);
                }
            };
            document.body.addEventListener('click', el.clickOutsideEvent);
        },
        unmounted(el) {
            document.body.removeEventListener('click', el.clickOutsideEvent);
        },
        getSSRProps() {
            return {};
        }
    });
});