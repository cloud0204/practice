let data = {
    blog: [
        { src: "jpg/1.jpg", time: "2020/06/28", title: "Lorem ipsum dolor, sit amet consectetur ommodi saepe sed dolor commodi saepe" },
        { src: "jpg/2.jpg", time: "2020/06/25", title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere commodi" },
        { src: "jpg/3.jpg", time: "2020/06/21", title: "Lorem ipsum dolor, sit amet consectetur  Facere commodi saepe" },
        { src: "jpg/4.jpg", time: "2020/06/20", title: "Lorem ipsum dolor, sit amet consectetur adcoe" }
    ],
    // stylelist: {
    //     color: 'red',
    //     fontSize: '50px',

    //   }
}

// Vue.component('component-shop',{
//     template:'<h3 v-for="item in contacts">6546465{{item.name}}買了{{item.number}}個</h3>',
//     data:()=>{
// return {cc:1}
//     }
// })
let vm = new Vue({
    el: ".blog",
    data: data
})
let vm1 = new Vue({
    el: ".news",
    data: data
})


let vm2 = new Vue({
    el: ".shoplist",
    data: {
        loading: false,
        contacts: [
            {
                "name": "醫療",
                "price": "49",
                "src": "jpg/1.jpg",
                "number": 1
            },
            {
                "name": "玩樂",
                "price": "99",
                "src": "jpg/2.jpg",
                "number": 1
            },
            {
                "name": "照顧",
                "price": "149",
                "src": "jpg/3.jpg",
                "number": 1
            }

        ],
        buy: [],
        bought: {
            "id": "",
            "items": [],
            "total": 0
        },
        // id: null,
        // index: null,
        sum: 0
    },
    mounted() {
        this.loading = true;
        axios.get("http://localhost:3000/contacts")
            .then((res) => {
                // console.log(res)
                this.contacts = res.data
            }).catch((err) => {
                console.log(err)
            });
        axios.get("http://localhost:3000/buy")
            .then((res) => {
                // console.log(res.data)
                this.buy = res.data
            }).catch((err) => {
                console.log(err)
            });
        axios.get("http://localhost:3000/bought")
            .then((res) => {
                // console.log(res.data)
                this.bought = res.data
            }).catch((err) => {
                console.log(err)
            });
        this.loading = false
    },
    methods: {
        totalprice() {
            let total = 0
            for (let i = 0; i < this.buy.length; i++) {
                let { number, price, sum } = this.buy[i];
                if (number < 0) this.buy[i].number = 0;
                sum = number * price

                total = total + sum
            }
            this.sum = total
            return total
        },
        submitbuy() {
            this.loading = true;
            axios.post("http://localhost:3000/bought", { "items": this.buy, "total": this.sum })
                .then((res) => {
                    console.log(res.data)
                    this.bought.items.push(res.data);
                }).catch((err) => {
                    console.log(err)
                })
            this.loading = false
        },
        cancelbuy(item, index) {
            this.loading = true;
            // console.log(item)
            let target = item.id;
            // console.log(target)
            // console.log(this.buy)
            // console.log(index)
            // this.buy.splice(index,1);
            // console.log(this.buy)
            axios.delete("http://localhost:3000/bought/" + target)
                .then((res) => {

                    this.bought.splice(index, 1);
                }).catch((err) => {
                    console.log(err)
                })
            this.loading = false
        }

    },
    // watch: {
    //     contacts: (val,oldval) => { console.log("99999") },
    //     deep: true
    // },
    // computed: {
    //     totalprice() {
    //         let total=0
    //         for (let i = 0; i < this.contacts.length; i++) {
    //             let { number, price, sum } = this.contacts[i];
    //             sum = number * price
    //             total=total+sum
    //         }
    //         return this.sum=total
    //     }
    // }
})

let care = "醫療";
let happy = "玩樂";
let relax = "照顧";
function buy(name) {
    let target = vm2._data.buy;
    let target2 = vm2._data.contacts;
    for (let i = 0; i < target.length; i++) {
        if (target[i].name.indexOf(name) === 0) {
            target[i].number = +target[i].number + 1;
            return vm2._data.buy = target
        }
    }
    for (let i = 0; i < target2.length; i++) {
        if (target2[i].name.indexOf(name) === 0) {
            let id = 0;
            if (target[0] !== undefined) { id = target[target.length - 1].id };
            let data = {
                "name": target2[i].name,
                "price": target2[i].price,
                "src": target2[i].src,
                "number": target2[i].number,
                "sum": 0,
                "id": +id + 1
            };
            target.push(data);
            vm2._data.buy = target
            return
        }
    }
}

let vm3 = new Vue({
    el: ".navbar",
    methods: {
        carofitem() {
            return vm2._data.buy.length
        }
    }
})
