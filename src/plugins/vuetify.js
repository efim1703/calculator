import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            light: {
                primary: '#FF9514',
                secondary: '#E1E1E1'
            }
        },
        options: {
            customProperties: true,
            variations: false
        }
    }
});
