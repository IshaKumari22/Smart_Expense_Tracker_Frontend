import axios from 'axios';
function getCookie(name){
         let cookieValue=null;
         if(document.cookie && document.cookie !==''){
            const cookies=document.cookie.split(';');
            for(let cookie of cookies){
                cookie=cookie.trim();
                if(cookie.startsWith(name + '=')){
                    cookieValue=decodeURIComponent(cookie.substring(name.length +1));
                    break;
                }
            }
        }
        return cookieValue; 
}
export const submitExpense=(data)=>
{
    return axios.post('http://127.0.0.1:8000/submit-expense/',data,{
        headers:{
            'X-CSRFToken':getCookie('csrftoken'),
            'Content-Type':'application/json',
        }
    });
};
export const getAllExpenses=()=>{
    return axios.get('http://127.0.0.1:8000/get-expenses/');

};