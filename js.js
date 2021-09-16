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

Vue.component('specialproducts', {

     data: function(){
            return{
                specialProductsArray: this.getSpecialProducts()
            }
        },

    methods: {
        getSpecialProducts(){
            fetch('products.json')
            .then(response => response.json())
            .then(data => {

                let productsArray = [];

                data.products[0].calathea.map(product => {
                    
                    productsArray.push(product)
                })
                data.products[1].gullranka.map(product => {
                    
                    productsArray.push(product)
                })
                data.products[2].monstera.map(product => {
                    
                    productsArray.push(product)
                })
                let endProductArray = [];
                productsArray.map(test => {
                    if(test.specialProduct === true)
                    {
                        endProductArray.push(test)
                        /* console.log(test) */
                    }})
                    console.log(endProductArray)
                return endProductArray; 
           })
       }
   }, 

    template: "<section id='specialProductsSection'>"
    + "<h1 width=250px height=250px>{{specialProductsArray}}</h1>"
   /*  + "<div id='productContainer' v-for='product in specialProductsArray'>"
    + "<article id='product-item1' class='productItems'> <img width='200' src='{{product.image}}'></img> <h3>{{product.name}}</h3> <p>{{product.description}}</p> <img></img> </article>" */
    /* + "</div>" */
    + "</section>"
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
        },
    }
)

var productsComponentVue = new Vue({
    el: '#productsComponent'
})