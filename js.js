Vue.component('siteheader', {
    template: "<header id='header'>"
        + "<a id='NavHome' class='Nav'>Hem</a>"
        + "<a id='NavProducts' class='Nav'>Växter</a>"
        + "<a id='NavAboutUs' class='Nav'>Om oss</a>"
        + "<a id='NavContactUs' class='Nav'>Kontakt</a>"
        + "<img src='images/shopping-cart.png' width='30' height='30' id='shoppingCart' class='Nav'/>"
        + "</header>"
})

Vue.component('sitecontent', {
    template: "<main id='bodyContent'>"
        + "<img src='images/header-background.jpg' id='bodyImage' width=100% height=auto> "
        + "<p id='bodyImageText'>Välkommen till ditt </br>Gröna Paradis</p>"
        + "</img>"
        + "</main>"
})

Vue.component('aboutus', {
    template: `<div id='aboutUsSection'>
    <h2 id='aboutUsHeader'>Vi är Grönt Paradis</h2>
    <img id='aboutUsImg' src='https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80'/>
    <h3 id='aboutUsSubHeader'>Vi lever för det gröna växtriket</h3>
    <p id='aboutUsText'>lorem ipsum dolor amit bla bla bla text kommer här en fin beskrivning av vad vi gör på grönt paradis du vet det, jag vet det. alla vet det.</p>
    </div>`
})

var productsComponentVue = new Vue({
    
    el: '#productsComponent',

    data: {
        specialProductsArrayTemp: []
    },

    methods: {
        getSpecialProducts: function () {
        fetch('products.json')
            .then(resp => resp.json())
            .then(data => {
                let count = 0;

                data.products.map(product => {
                    if (product.specialProduct === true && count <= 2) {
                        this.specialProductsArrayTemp.push(product)
                        console.log(this.specialProductsArrayTemp)
                        count++;
                    }
                })
            })
        }
    },

    created() {
        this.getSpecialProducts();
    }
})

Vue.component('specialproducts', {

    data: {
        specialProductsArray: []
    },
    methods:{
        setList: function(){
            this.specialProductsArray = productsComponentVue.specialProductsArrayTemp
        }
    },
    
    created(){
        this.setList()
    },

    template: `<section id='specialProductsSection'>
        <h2 id='productsHeader'>Utvalda produkter</h2>
        <div class='productContainer' v-for='product in specialProductsArray'> 
        <article class='productItems'> <img class='productsImage':src='product.image'/> <h3 class='product-title'>{{product.name}}</h3> <p class='product-description'>{{product.description}}</p> <button class='specialProductsButton'><span class='specialProductsButtonText'>Lägg till i korgen</span></button> </article>
        </div>
        </section>`
})













var componentDemoVue = new Vue(
    {
        el: '#headerComponent',
        data: {
            mobileView: false,
            showNav: false
        },
        methods: {
            getView() {
                this.mobileView = window.innerWidth <= 600;
            },
            showNavMobile() {

            }
        },
        created() {
            this.getView();
            window.addEventListener('resize', this.getView);
        }
    }
)

var contentComponentVue = new Vue(
    {
        el: '#contentComponent',
        data: {
            test: true
        }
    }
)

var aboutUsComponentVue = new Vue(
    {
        el: '#aboutUsComponent'
    }
)

