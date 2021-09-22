Vue.component('sitenav', {
    template: `<div id='Nav'>
    <p id='navClose' v-on:click='navCloseBtn()'><i class='fas fa-times'></i></p>
    <ul id='menuList'>
        <li id='NavHome' class='navLinks' v-on:click='navCloseBtn()'>Hem</li>
        <li id='NavProducts' class='navLinks' v-on:click='navCloseBtn()'>Växter</li>
        <li id='NavAboutUs' class='navLinks' v-on:click='navCloseBtn()'>Om oss</li>
        <li id='NavContactUs' class='navLinks' v-on:click='navCloseBtn()'>Kontakt</li>
    </ul>
    </div>
    `
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

Vue.component('contactus', {
    template: `<div id='contactUsContainer'>
    <h2 id='contactUsHeader'>Kontakta oss</h2>
    <label class='inputLabel'>Förnamn</label>
    <input class='inputForm' placeholder='Fyll i förnamn...'></input>
    <label class='inputLabel'>E-mail</label>
    <input class='inputForm' placeholder='Fyll i e-mail...'></input>
    <label class='inputLabel'>Meddelande</label>
    <textarea class='inputForm' id='messageInput' placeholder='Fyll i meddelande...'></textarea >
    <button id='messageButton'>Skicka meddelande</button>
    </div>` 
})

Vue.component('vuefooter', {
    template: `<div id='footer'>
    <a class='footerLinks'>Kontaktuppgifter</a>
    <a class='footerLinks'>GP@gmail.com</a>
    <a class='footerLinks'>0739995552</a>
    <div >
        <span class="fab fa-facebook-square"></span>
        <span class="fab fa-instagram"></span>
        <span class="fab fa-twitter"></span>
    </div>
    </div>` 
})



Vue.component('productsfinal',{

    data:{
        uniqueProductArray: [],
        dataArray: []
    },

    methods: {
        getProduct: function(){
         this.uniqueProductArray = Array.from(new Set(cartItems))
            console.log(this.uniqueProductArray[0])
            let i = 0;
            let tempDataArray = [];
            vueInstance.fetchResult.map(test => 
            {   
                if(test.name === this.uniqueProductArray[i])
                {
                    tempDataArray.push(test)
                    i++
                }
            })
            console.log(tempDataArray)


            

            var count = {};
            cartItems.forEach(function(i) { count[i] = (count[i]||0) + 1;});
            console.log(count);

           /*  var result = tempDataArray.map(el => {
                var object = Object.assign({}, el)
                let i = 0;
                if(object.name === count)
                {
                    object.amount = count[i]
                    i++
                }
                console.log(object)
                return object;
            }) */
            
            this.dataArray = tempDataArray

        }
    },
    computed: {
        showChart: function() {
            this.dataArray = this.getProduct()
        }
    },
    created(){ 
        this.getProduct()
    },

    template: `<div id='productsFinalContainer'>
    <h2>Tillagda produkter</h2>
    <article class='finalProductArticle' v-for='products in this.dataArray'>
        <img width='200em' :src='products.image' />
        <h4>{{products.name}} </h4>
        <p>Antal: </p>    
    </article>
    <p>Total:</p>
    <button>Slutför köp</button>
    </div>
    ` 
})


//vue instance

var vueInstance = new Vue({
    
    el: '#bodyContainer',

    data: {
        specialProductsArrayTemp: [],
        mobileView: false,
        shoppingCartAmount: 0,
        tab: "start",
        fetchResult: []
    },

    methods: {
        getSpecialProducts: function () 
        {
        fetch('products.json')
            .then(resp => resp.json())
            .then(data => {
                this.fetchResult = data.products;
                let count = 0;
                console.log(this.tab)
                console.log(this.fetchResult)

                data.products.map(product => {
                    if (product.specialProduct === true && count <= 2) {
                        this.specialProductsArrayTemp.push(product)
                        count++;
                    }
                })
            })
        },
        getView() 
        {
            this.mobileView = window.innerWidth <= 600;
        },
        openCart: function()
        {
           this.tab = "cart"
        },
        openStart: function()
        {
            this.tab = "start"
        },
        showNav: function()
        {
            document.getElementById('mobileNav').className = "slide-in"
            document.getElementById("hamburgerMenu").style.display = "none"
            document.getElementById('overlay').style.display = "block"
            document.getElementById('bodyContent').style.overflow = "hidden"
        },
    },   
    created() {
        this.getSpecialProducts();
        this.getView();
        window.addEventListener('resize', this.getView);
    }
})

Vue.component('specialproducts', {

    data: {
        specialProductsArray: []
    },
    methods:{
        setList: function(){
            this.specialProductsArray = vueInstance.specialProductsArrayTemp
        }
    },
    
    created(){
        this.setList()
    },

    template: `<section id='specialProductsSection'>
        <h2 id='productsHeader'>Utvalda produkter</h2>
        <div class='productContainer' v-for='product in specialProductsArray'> 
        <article class='productItems'> <img class='productsImage':src='product.image'/> <h3 class='product-title'>{{product.name}}</h3> <p class='product-description'>{{product.description}}</p> <button onClick='addSpecialToCart(this)' class='specialProductsButton'><span class='specialProductsButtonText'>Lägg till i korgen</span></button> </article>
        </div>
        </section>`
})


//js functions

 function navCloseBtn()
    {
        document.getElementById('mobileNav').className = ""
        document.getElementById("hamburgerMenu").style.display = "block"
        document.getElementById('overlay').style.display = "none"
        document.getElementById('bodyContent').style.overflow = "visible"
    }

var cartItems = [];

function addSpecialToCart(button){
    alert(button.parentNode.querySelector('h3').textContent)
    cartItems.push(button.parentNode.querySelector('h3').textContent)
    vueInstance.shoppingCartAmount++;
    console.log(cartItems[0])
}