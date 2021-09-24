import './SignIn.sass'

const SignIn = ()=>{

    while (document.querySelector('.main-container').firstChild) {
        document.querySelector('.main-container').removeChild(document.querySelector('.main-container').firstChild);
    }
    if(!document.querySelector('.signInContainer')){
        let temp = document.getElementById("signIn");
        let template = document.importNode(temp.content, true);
        document.querySelector('.main-container').insertBefore(template , document.querySelector('.main-container').firstChild)
            
    }
}

export default SignIn