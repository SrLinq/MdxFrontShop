
const apiFunc= new ApiFetch()
const { createApp } = Vue;
      createApp({
        data() {
          return {
            productsss:[],
            searchTerm: "",
            products: [
              {
                id: 1,
                name: "Small Toy",
                description: "Just a small toy for kids — durable and fun.",
                image: "0.jpeg",
                 location:"Rome",
                count: 0,
                price: 500,
              },
              {
                id: 6,
                name: "A Toy",
                description: "Just a small toy for kids — durable and fun.",
                image: "0.jpeg",
                 location:"London",
                count: 7,
                price: 400,
              },
              {
                id: 2,
                name: "Puzzle Blocks",
                description:
                  "Brightly colored blocks that develop motor skills.",
                image: "0.jpeg",
                 location:"Dubai",
                count: 1,
                price: 300,
              },
              {
                id: 3,
                name: "Story Book",
                description: "An illustrated bedtime story for young readers.",
                image: "0.jpeg",
                location:"Dubai",
                count: 4,
                price: 100,
              },
            ],
            cart: [],
            currentPage: "catalog",
            activeFilter: "all",
            activeSort: "name-asc",
            customerName: "",
            customerPhone: "",
            customerEmail: "",
            customerAddress: "",
            minPrice:0,
            maxPrice:1000,
            selectedLocations: []
          };
        },
        mounted(){
            
        },
        computed: {
          availableLocations() {
            return Array.from(
              new Set(this.products.map((product) => product.location))
            );
          },
            
         filteredProducts() {
            const term = this.searchTerm.trim().toLowerCase();
            let products = this.products;

            if (term) {
              products = products.filter((product) =>
                product.name.toLowerCase().includes(term)
              );
            }
            
                
             products= products.filter((product)=>this.minPrice<=product.price && product.price<=this.maxPrice)
          

            if (this.activeFilter === "in-stock") {
              products = products.filter((product) => product.count > 0);
            } else if (this.activeFilter === "out-of-stock") {
              products = products.filter((product) => product.count === 0);
            } else if (
              this.activeFilter === "location" &&
              this.selectedLocations.length
            ) {
              products = products.filter((product) =>
                this.selectedLocations.includes(product.location)
              );
            }
           
           
            const sorted = [...products];
            switch (this.activeSort) {
              case "name-desc":
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
              case "price-asc":
                sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
                break;
              case "price-desc":
                sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
                break;
              default:
                sorted.sort((a, b) => a.name.localeCompare(b.name));
            }
            
            return sorted;
          },
          isDetailsComplete() {
            return Boolean(
              this.customerName.trim() &&
                this.customerPhone.trim() &&
                this.customerEmail.trim() &&
                this.customerAddress.trim()
            );
          },
          cartCount() {
            return this.cart.length;
          },
          cartMessage() {
            if (!this.cartCount) {
              return "Your cart is empty.";
            }
            return `You have ${this.cartCount} item${
              this.cartCount === 1 ? "" : "s"
            } in the cart.`;
          },
          cartDetails() {
            const counts = new Map();
            this.cart.forEach((product) => {
              const existing = counts.get(product.id);
              if (existing) {
                existing.count += 1;
              } else {
                counts.set(product.id, {
                  id: product.id,
                  name: product.name,
                  count: 1,
                });
              }
            });
            return Array.from(counts.values());
          },
          overallPrice() {
            return this.cart.reduce((sum, item) => sum + (item.price || 0), 0);
          },
        },
        methods: {
        
          goToPage(page) {
            this.currentPage = page;
          },
          proceedToDetails() {
            if (!this.cartCount) {
              return;
            }
            this.goToPage("details");
          },
          reviewOrder() {
            if (!this.isDetailsComplete) {
              return;
            }
            this.goToPage("summary");
          },
          addToCart(product) {
            if (product.count <= 0) {
              return;
            }
            this.cart.push({
              id: product.id,
              name: product.name,
              price: product.price,
            });
            product.count -= 1;
          },
          deleteFromCart(product) {
            console.log(product);
            this.cart.shift(product);
            const match = this.products.find((item) => item.id === product.id);
            if (match) {
              match.count += 1;
            }
          },
        },
      }).mount("#app");
