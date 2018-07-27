// async function getProfile() {
//   const isLogined = await isUserLogined(req.session);
//   if (isLogined) {
//     return await getUser(req.session);
//   }
//   return false;
// }

// async function asyncCall() {
//   const v1 = await asyncFunc();
//   const v2 = await asyncFunc(v1);
//   const v3 = await asyncFunc(v2);
//   return v3;
// }


// async function retriveProfile(email) {
//   const user = await getUser(email);
//   const roles = await getRoles(user);
//   const level = await getLevel(user);
//   return [user, roles, level];
// }


// async function retriveProfile(email) {
//   const user = await getUser(email);
//   const p1 = getRoles(user);
//   const p2 = getLevel(user);
//   const roles = await p1;
//   const level = await p2;
//   return [user, roles, level];
// }



// async function retriveSize(imgs) {
//   const result = [];
//   for (const img of imgs) {
//     result.push(await getSize(img));
//   }
// }



// async function retriveSize(imgs) {
//   return Promise.all(imgs.map(img => getSize(img)));
// }




console.log("1");
setTimeout(function () {
    console.log("2")
}, 300);
setTimeout(function () {
    console.log("3")
}, 200);
setTimeout(function () {
    console.log("4")
}, 100);

//  1 5 4 3 2
async function fn1(name) {
     console.log(`f1 开始执行`);
    return name;
}
async function fn2(name) {
    await console.log(`f2 开始执行`);
    let myName = await fn1(name);
    return myName;
}
fn2('wang').then( (result)=> {
    console.log(`result ：${ result }`);
}).catch((err)=>{
     console.log(err);
});
console.log("5");
// 1 f2 5 wang 4 3 2