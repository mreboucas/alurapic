import Vue from 'vue'

/** para usar -> v-meu-transform */
Vue.directive('meu-transform', {

    bind(el, binding, vnode) {
        
        console.log('Diretiva associada!')
        console.log(el);
        let current = 0;

        el.addEventListener('dblclick', function(){
            /**let incremento = 90;
            let animate = false;*/


           /** if (binding.value) {
                
                incremento = binding.value.incremento;
                animate = binding.value.animate;

            } */
            let incremento = binding.value || 90;  
            let efeito;       

            if (!binding.arg || binding.arg == 'rotate') {

                if (binding.modifiers.reverse) {
                    current -= incremento;
                } else {
                    current += incremento;
                }

                efeito = `rotate(${current}deg)`;

            } else if (binding.arg = 'scale') {
                efeito = `scale(${incremento})`;
            }

            el.style.transform = efeito;

            if (binding.modifiers.animate) {
                el.style.transition = 'transform 0.5s'; 
            }
        });
    }
});