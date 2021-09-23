Vue.component('sitenav', {

    methods: {
        closeButton: function(){
        document.getElementById('mobileNav').className = ""
        document.getElementById("hamburgerMenu").style.display = "block"
        document.getElementById('overlay').style.display = "none"
        document.getElementById('bodyContent').style.overflow = "visible"
        },
        adminButton: function(){
            vueInstance.tab = "admin"
            vueInstance.errorManagement = true
            this.closeButton()
        },
        homeButton: function(){
            vueInstance.tab = "start"
            this.closeButton()
        }
    },

    template: `<div id='Nav'>
    <p id='navClose' @click='this.closeButton'><i class='fas fa-times'></i></p>
    <ul id='menuList'>
        <li id='NavHome' class='navLinks' @click='homeButton'>Hem</li>
        <li id='NavProducts' class='navLinks' @click='this.closeButton'>Växter</li>
        <li id='NavAboutUs' class='navLinks' @click='this.closeButton'>Om oss</li>
        <li id='NavContactUs' class='navLinks' @click='this.closeButton'>Kontakt</li>
        <li id='NavAdmin' class='navLinks' @click='adminButton'>Admin</li>
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
    
    methods: {
        sendMessage: function(){
            alert("Tack för ditt meddelande! Vi hör av oss inom kort.")
            document.getElementById('input1').value = ""
            document.getElementById('input2').value = ""
            document.getElementById('messageInput').value = ""
        }
    },
    
    template: `<div id='contactUsContainer'>
    <h2 id='contactUsHeader'>Kontakta oss</h2>
    <label class='inputLabel'>Förnamn</label>
    <input id='input1' type="text" class='inputForm' placeholder='Fyll i förnamn...'></input>
    <label class='inputLabel'>E-mail</label>
    <input id='input2' class='inputForm' placeholder='Fyll i e-mail...'></input>
    <label  class='inputLabel'>Meddelande</label>
    <textarea class='inputForm' id='messageInput' placeholder='Fyll i meddelande...'></textarea >
    <button id='messageButton' @click='sendMessage' >Skicka meddelande</button>
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

    data: {
            uniqueProductArray: [],
            dataArray: [],
            totalPrice: 0
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

            this.dataArray = tempDataArray
            

            var count = {};
            cartItems.forEach(function(i) { count[i] = (count[i]||0) + 1;});
            console.log(count);

            this.dataArray.map(el => {
                var object = Object.assign({}, el)
                console.log(count[object.name])

                let arrayOfNames = Object.getOwnPropertyNames(count);

                for(let i = 0; i < arrayOfNames.length; i++)
                {
                    if(object.name === arrayOfNames[i])
                    {
                        object.amount = count[object.name]

                        this.dataArray.map(chosenProduct => {
                            if(chosenProduct.name === arrayOfNames[i])
                            {
                                chosenProduct.amount = count[object.name]
                            }
                        })
                    }
                }
            })
        },
        getTotalPrice: function(){
            let tempTotalPrice = 0;
            this.dataArray.forEach(data => {
                for(let i = 0; i < data.amount; i++)
                {
                    tempTotalPrice += data.price
                }
            })

            console.log(tempTotalPrice)
            this.totalPrice = tempTotalPrice
            console.log(this.totalPrice)
        },
        checkout: function(){
            alert("Tack för köpet!")
            vueInstance.shoppingCartAmount = 0
            cartItems = []
            vueInstance.tab = "start"
        }
    },

    created(){ 
        this.getProduct(),
        this.getTotalPrice()
    },

    template: `<div id='productsFinalContainer'>
    <h2 class="finalProductH2">Tillagda produkter</h2>
    <article class='finalProductArticle' v-for='products in this.dataArray'>
        <img width='70%' height='80%' :src='products.image' />
        <h4>{{products.name}} </h4>
        <span class='finalProductAmount'>Antal: {{products.amount}}</span><span class="finalProductPrice">{{products.price}}:-</span>
    </article>
    <div>
        <p>Total: {{this.totalPrice}}:-</p>
        <button v-on:click='this.checkout'>Slutför köp</button>
    </div>
    </div>
    ` 
})

Vue.component('adminpage', {

    data: function() {
        return {
            productToAddId: 10
        }
    },

    methods: {

        changeSpecialProducts: function(productID){
            vueInstance.fetchResult.map(productOfAllProducts => {
                
                if(productOfAllProducts.id === productID){ 

                    let productAlreadyOnPage = vueInstance.specialProductsArrayTemp.some(product => {
                        return product.id === productID
                    })


                    if(productAlreadyOnPage == false)
                    {
                        vueInstance.specialProductsArrayTemp.push(productOfAllProducts)
                        vueInstance.showSpecialProducts = true
                    }
                    else if (productAlreadyOnPage === true)
                    {
                        let index = 0;
                        vueInstance.specialProductsArrayTemp.map(product => {
                            if(product.id === productID)
                            {
                                vueInstance.specialProductsArrayTemp.splice(index,1)
                                if(vueInstance.specialProductsArrayTemp.length == 0) {vueInstance.showSpecialProducts = false}
                            }
                            else
                            {
                                index++
                            }
                        })
                    }

                    console.log(productOfAllProducts); 
                }
            })
        },

        addProduct: function(){
            let inputName = document.getElementById('inputName').value
            let inputPrice = document.getElementById('inputPrice').value
            let inputRating = document.getElementById('inputRating').value
            let inputImage = document.getElementById('inputImage').value
            let inputDescription = document.getElementById('inputDescription').value
            let inputStock = document.getElementById('inputStock').value
            let inputType = document.getElementById('inputType').value

            if(inputName.length == 0 || inputPrice.length == 0 || inputRating.length == 0 || inputImage.length == 0 ||
            inputDescription.length == 0 || inputStock == 0) 
            {
                alert("Vänligen fyll i alla fält!")
            }
            else
            {
                let productToAdd = {
                    "id": this.productToAddId++,
                    "name": inputName,
                    "price": inputPrice,
                    "rating": inputRating,
                    "image": "https://images.unsplash.com/photo-1535242208474-9a2793260ca8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80",
                    "specialProduct": false,
                    "description": inputDescription,
                    "stock": inputStock,
                    "type": inputType
                }

                let boolCheck = vueInstance.fetchResult.some(fetchProduct => {
                        return fetchProduct.name == productToAdd.name 
                })

                console.log(boolCheck)
                if(boolCheck == false)
                {
                    vueInstance.fetchResult.push(productToAdd)
                }
            console.log(productToAdd)
            }
        }
    },

    created(){
        console.log("skapad")
    },

    template: `<div id='adminPageContainer'>
    <h2>Admin Sida</h2>
    <div id="specialProductsAdminContainer">
        <h3>Special produkter</h3>
        <div v-for="products in vueInstance.fetchResult" id="checkboxContainer">
            <p class='checkboxInput'>{{products.name}} <input type="checkbox" class='checkboxInput' @click='changeSpecialProducts(products.id)'></input></p>      
        </div>
    </div>
    
    <div id="addProductsContainer">
        <h3>Lägg till produkt</h3>
        <div id="inputContainer">
            <select id='inputType'>
                <option value="calathea">Calathea</option>
                <option value="gullranka">Gullranka</option>
                <option value="monstera">Monstera</option>
            </select></br>
            <input class='addProductsInputs' placeholder='Produktnamn...' id='inputName' type="text"></input></br>
            <input class='addProductsInputs' placeholder='Produktpris...' id='inputPrice' type="number"></input></br>
            <input class='addProductsInputs' placeholder='Produktrating...' id='inputRating' type="number"></input></br>
            <input class='addProductsInputs' placeholder='Produktbild...' id='inputImage' type="text"></input></br>
            <input class='addProductsInputs' placeholder='Produktlagersaldo...' id='inputStock' type="number"></input></br>
            <textarea placeholder='Produktbeskrivning...' id='inputDescription' type="text"></textarea></br>
            <button id="addProductButton" @click='addProduct'>Lägg till produkt</button>
        </div>
    </div>
    </div>`
})

//vue instance

var vueInstance = new Vue({
    
    el: '#bodyContainer',

    data: {
        specialProductsArrayTemp: [],
        mobileView: false,
        shoppingCartAmount: 0,
        tab: "start",
        fetchResult: [],
        errorManagement: false,
        showSpecialProducts: false
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


 function navCloseBtn(){
    document.getElementById('mobileNav').className = ""
    document.getElementById("hamburgerMenu").style.display = "block"
    document.getElementById('overlay').style.display = "none"
    document.getElementById('bodyContent').style.overflow = "visible"
 }

var cartItems = [];

function addSpecialToCart(button){
    alert(button.parentNode.querySelector('h3').textContent + " tillagd i varukorgen!")
    cartItems.push(button.parentNode.querySelector('h3').textContent)
    vueInstance.shoppingCartAmount++;
    console.log(cartItems[0])
}