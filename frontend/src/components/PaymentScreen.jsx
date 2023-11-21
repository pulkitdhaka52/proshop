import { useState,useEffect } from "react";
import {Form, Button, Col} from "react-bootstrap";
import FormContainer from "./FormContainer";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector,useDispatch } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] =  useState('Paypal');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state)=>state.cart);
    const {shippingAddress} = cart;

    useEffect(() =>{
       if(!shippingAddress){
         navigate('/shippingAddress')
       } 
    },[shippingAddress, navigate])

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeOrder');
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        className="my-2"
                        label='Paypal or Credit Card'
                        id='Paypal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant="primary">Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen