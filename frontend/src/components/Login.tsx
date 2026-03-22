
import { useState } from "react";

function Login(){

    const app_name = '147.182.173.10';
    function buildPath(route:string):string{
        if(import.meta.env.MODE != 'development'){
            return 'http://' + app_name + ':5001/' + route;
        }else{
            return 'http://localhost:5001/' + route;
        }
    }

    const [message, setMessage] = useState('');
    const [loginName, setLoginName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');


    async function doLogin(event:any):Promise<void>{
        event.preventDefault();

        var obj = {login: loginName, password: loginPassword};
        var js = JSON.stringify(obj);

        try{
            const response = await fetch(buildPath('api/login'),
            {method:'POST',body:js,headers:{'Content-Type':
            'application/json'}});
            
            var res = JSON.parse(await response.text());

            if(res.id <=0){
                setMessage('Login Failed');
            }
            else{
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                window.location.href = '/cards';
            }
        }
        catch(error:any){
            alert(error.toString());
            return;
        }
        alert('doIt() ' + loginName + ' ' + loginPassword);
    };

    function handleSetLoginName(e:any):void{
        setLoginName(e.target.value);
    }

    function handleSetLoginPassword(e:any):void{
        setLoginPassword(e.target.value);
    }


    return(
        <div id="loginDiv">
            <span id="inner-title">PLEASE LOG IN</span><br />
            <input type="text" id="loginName" placeholder="Username" onChange={handleSetLoginName}/><br />
            <input type="password" id="loginPassword" placeholder="Password" onChange={handleSetLoginPassword}/><br />
            <input type="submit" id="loginButton" className="buttons" value = "Do It"
            onClick={doLogin} />
            <span id="loginResult">{message}</span>
        </div>
    );
};

export default Login;
