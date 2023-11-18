import React from 'react'
import '@/components/AuthPopup/AuthPopup.css'
import Image from 'next/image'
import logo from '@/app/assets/logo.png'
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai'


interface AuthPopupProps {
    setShowpopup: React.Dispatch<React.SetStateAction<boolean>>;
}   

const AuthPopup: React.FC<AuthPopupProps> = ({ setShowpopup }) => {
    const [showSignup, setShowsignup] = React.useState<boolean>(false)

    const handleLogin = () => {}
    const handleSignup = () => {}
  return (
    <div className='popup'>
        <button className='close'
                onClick={() => {
                    setShowpopup(false)
                }}
            >
                <AiOutlineClose />
            </button>
        {
            showSignup ?(
                <div className='authform'>
                    <div className="left">
                        <Image src={logo} alt="logo" />
                    </div>
                    <div className="right">
                        <h1>Signup to Become a Freak.</h1>
                        <form action="">
                            <Input
                                color="warning"
                                placeholder="Email"
                                size="lg"
                                variant="solid"
                                />

                            <Input
                                color="warning"
                                placeholder="Password"
                                size="lg"
                                variant="solid"
                                type="password"
                                />

                                <div className="form_input_leftright">
                                    <Input color="warning" size="lg" variant='solid' type='number' placeholder='Age'/>
                                    <Input color="warning" size="lg" variant='solid' type='number' placeholder='Weight'/>
                                </div>

                                <Select
                                    color="warning"
                                    placeholder="Gender"
                                    size="lg"
                                    variant="solid"
                                    >
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>

                                <br/>
                                <label htmlFor="">Height</label>
                                <div className="form_input_leftright">
                                    {/* 5ft 11inch */}
                                    <Input color="warning" size="lg" variant='solid' type='number' placeholder='ft'/>
                                    <Input color="warning" size="lg" variant='solid' type='number' placeholder='in'/>
                                </div>


                                <button onClick={()=>{
                                        handleSignup()
                                    }}>Sign Up</button>
                        </form>
                        <p>Already have an Account <button onClick={()=>{
                                        setShowsignup(false)
                                    }}>Login</button></p>
                    </div>
                </div>
            ):(
                <div className='authform'>
                    <div className="left">
                        <Image src={logo} alt="logo" />
                    </div>
                    <div className="right">
                        <h1>Login to Become a Freak.</h1>
                        <form action="">
                            <Input
                                color="warning"
                                placeholder="Email"
                                size="lg"
                                variant="solid"
                                />

                            <Input
                                color="warning"
                                placeholder="Password"
                                size="lg"
                                variant="solid"
                                type="password"
                                />
                                <button onClick={()=>{
                                        handleLogin()
                                    }}>Log In</button>
                        </form>
                        <p>Don't have an Account <button onClick={()=>{
                                        setShowsignup(true)
                                    }}>Signup</button></p>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default AuthPopup