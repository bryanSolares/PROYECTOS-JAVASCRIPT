class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  constructor(div) {
    this.div = div;
  }

  addProduct(product) {
    const element = document.createElement("div");
    element.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
                <strong>Product Name: </strong> ${product.name}
                <strong>Product Price: </strong> ${product.price}
                <strong>Product Year: </strong> ${product.year}
                <a href="#" class="btn btn-danger" name="delete">Delete</a>
            </div>
        </div>
      `;

    this.div.appendChild(element);
    this.showMessage("Product added successfully", "success");
  }

  resetForm(form) {
    form.reset();
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.parentElement.remove();
      this.showMessage("Product deleted Successfully", "info");
    }
  }

  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const app = document.querySelector("#app");
    container.insertBefore(div, app);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 1500);
  }
}

//DOM EVENTS
const product_form = document.querySelector("#product-form");
const product_list = document.querySelector("#product-list");
const ui = new UI(product_list);

product_form.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const year = document.querySelector("#year").value;

  const product = new Product(name, price, year);

  if (name === "" || price === "" || year === "") {
    return ui.showMessage("Complete Fields please", "danger");
  }

  ui.addProduct(product);
  ui.resetForm(product_form);
});

product_list.addEventListener("click", event => {
  ui.deleteProduct(event.target);
});
