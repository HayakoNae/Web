// window.onload = function()
// {
//     let item = document.getElementsByClassName("item");
//     let it = item[0].getElementsByTagName("div");

//     let content = document.getElementsByClassName("content");
//     let con = content[0].getElementsByTagName("div");

//     for(let i = 0;i<it.length;i++)
//     {
//         it[i].onclick = function()
//         {
//             for(let j=0;j<it.length;j++)
//             {
//                 it[j].className = '';
//                 con[j].style.display = "none";
//             }
//             this.className = "active";
//             it[i].index = 1
//             con[this.index].style.display = block;
//         }
//     }
// }