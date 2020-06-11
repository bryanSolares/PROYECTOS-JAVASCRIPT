const signUpForm = document.querySelector("#signUpForm");
const signInForm = document.querySelector("#signInForm");
const logout = document.querySelector("#logout");
const postList = document.querySelector(".posts");

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            signUpForm.reset();
            $("#signUpModal").modal("hide");
            console.log("signup");
        })
        .catch(error => console.error(error));
});

signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#signin-email").value;
    const password = document.querySelector("#signin-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            signInForm.reset();
            $("#signInModal").modal("hide");
            console.log("signin");
        })
        .catch(error => console.error(error));
});

logout.addEventListener("click", e => {
    e.preventDefault();
    auth.signOut()
        .then(() => console.log('Sign out'))
        .catch(error => console.error(error));
});

auth.onAuthStateChanged(user => {
    if (user) {
        console.log(firestore.colletion)
        /*firestore.colletion('posts')
            .get()
            .then(snapshot => {
                console.log(snapshot);
                setupPosts(snapshot);
            })
            .catch(error => console.error(error));*/
    } else {
        console.log("SignOut");
    }
});

const setupPosts = data => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const li = `
            <li class="list-group-item list-group-item-action">
                <h5>${doc.title}</h5>
                <p>${doc.description}</p>
            </li>
            `;
            html += li;
        });
        postList.innerHTML = html;
    }else{
        postList.innerHTML = `<p class="text-center">Login para visualizar las publicaciones</p>`
    }
};