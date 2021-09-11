const userName = document.getElementById("userName");
const email = document.getElementById("userEmail");
const password = document.getElementById("userPassword");


// const signupFunc = () => {
//     if (email.value === null || email.value === undefined || email.value === "" || password.value === null || password.value === undefined || password.value === "") {
//         alert("Please fill the form")
//     } else {

//         let currentUser = {
//             username: userName.value,
//             email: email.value,
//             password: password.value,
//         }

//         const users = JSON.parse(localStorage.getItem("userData")) || [];
//         users.push(currentUser);

//         localStorage.setItem("userData", JSON.stringify(users))
//         location.href = "login.html";
//     }
// }


const signupFunc = () => {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
            var uid = user.uid;
            console.log(uid);

            const myUser = {
                userName: userName.value,
                email: email.value,
                password: password.value
            }


            firebase.database().ref(`users/${uid}`).set(myUser)
                .then(() => {
                    alert("User register hogaya");
                    location.href = "login.html";
                });

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode)
            alert(errorMessage)
            // ..
        });
}


//Login Account
function loginFunc() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            var uid = user.uid;
            console.log(uid);
            // alert("Mabrook you are signed in")
            location.href = "dashboard.html";
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode)
            alert(errorMessage)
        });

}




// //Login Account
// function loginFunc() {
//     const email = document.getElementById("email");
//     const password = document.getElementById("password");
//     let loginUser = {
//         email: email.value,
//         password: password.value,
//     }
//     console.log(loginUser);

//     let getData = JSON.parse(localStorage.getItem("userData"));
//     console.log(getData)
//     var signedInFlag = false;

//     if ((email.value.length && password.value.length) === 0) {
//         alert("Enter the email Id or Password");
//     } else {
//         //checking and comparison
//         for (i = 0; i < getData.length; i++) {
//             if (getData[i].email === loginUser.email && getData[i].password === loginUser.password) {
//                 signedInFlag = true;
//                 console.log(signedInFlag);
//             } else {
//                 console.log("no compare")
//                 console.log(getData[i].email)
//                 console.log(getData[i].password)
//                 console.log(loginUser.email)
//                 console.log(loginUser.password)
//             }

//         }
//         if (signedInFlag) {
//             alert("Mubaraka");
//         } else {
//             alert("Ponka")
//         }
//     }
// }



const dashboard = () => {
    const userName = document.getElementById('userName');

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            console.log(uid);

            let creatUser = document.getElementById("userName");
            let userCategoy = document.getElementById("")

            firebase
                .database()
                .ref(`users/${uid}`)
                .once("value", (data) => {
                    console.log(data.val());
                    const usersDetail = data.val();
                    console.log(usersDetail.userName)

                    console.log(userName);
                    userName.innerText = `${usersDetail.userName.toUpperCase()} TEAMS`

                    // alert(usersDetail.email)
                });





            // ...
        } else {
            // User is signed out
            // ...
            location.href="login.html";
        }
    });
}

const logout = ()=>{
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}

console.log(memberName,mmbrCategory,mmbrEmail);

const creatTeam = ()=>{
    
    let memberName = getElementById("userName2");
    let mmbrCategory = getElementById("category2");
    let mmbrEmail = getElementById("userEmail2");

    if (memberCategory.value != "Category") {
        var key = firebase.database().ref("user").push().key;
    
        //.......................{Now We Will Put Data in Local Storage}..........................
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
    
            const myTeamMember = {
              memberName: memberName.value,
              mmbrCategory: mmbrCategory.value,
              mmbrEmail: mmbrEmail.value,
              memberKey: key,
              leaderUid: uid,
            };
    
            console.log(myTeamMember);
            firebase
              .database()
              .ref(`users/${uid}/myTeamMember/${key}`)
              .set(myTeamMember);
            const createBtn = document.getElementById("createTeam");
            createBtn.setAttribute("data-dismiss", "modal");
    
            if (category.value == "Developers") {
              let developerMembers = (document.getElementById(
                "developers"
              ).innerText += `${myTeamMember.memberName}, `);
            } else if (category.value == "UI/UX Designers") {
              let animatorMembers = (document.getElementById(
                "uiUxDesigners"
              ).innerText += `${myTeamMember.memberName}, `);
            }
            // ...
          } else {
            // User is signed out
            // ...
          }
        });
      } else {
        alert("Please put correct category");
      }

}

