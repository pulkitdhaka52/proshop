import { useEffect, useState } from "react";
import {Link,useNavigate,useParams} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import {toast} from "react-toastify";
import { useUpdateProductMutation, useGetProductDetailsQuery,useUploadProductImageMutation } from "../../slices/productsApiSlice";


const ProductEditScreen = () => {
    const {id:productId} =  useParams('id');
    const[name, setName] =  useState('');
    const[price,setPrice] =  useState(0);
    const[description,setDescription] =  useState('');
    const[countInStock,setCountInStock] =  useState(0);
    const[image,setImage] =  useState('');
    const[brand,setBrand] =  useState('');
    const[category,setCategory] =  useState('');
    const {data:productDetails, isLoading, error} =  useGetProductDetailsQuery(productId);
    
    const[updateProduct, {isLoading:loadingUpdate}] = useUpdateProductMutation();
    const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

    const navigate = useNavigate();

    useEffect(()=>{
        if(productDetails){
            setName(productDetails.name);
            setPrice(productDetails.price);
            setDescription(productDetails.description);
            setCountInStock(productDetails.countInStock);
            setImage(productDetails.image);
            setBrand(productDetails.brand);
            setCategory(productDetails.category);
        }
        
    },[productDetails]);

    const submitHandler = async (e) =>{
        e.preventDefault();
        const values = {
            productId,
            name,
            image,
            brand,
            description,
            category,
            countInStock,
            price
        }
        const result =  await updateProduct({...values});
        if(result.error){
            toast.error(result.error);
        }else{
            toast.success('Product update successfully');
            navigate('/admin/productlist');
        }
    }

    const uploadFileHandler = async (e) =>{
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res =  await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
    }

  return (
    <>
        <Link to='/admin/productlist' className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader/>}
            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter image url'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.Control
                    label='Choose File'
                    onChange={uploadFileHandler}
                    type='file'
                  ></Form.Control>
                  {loadingUpload && <Loader />}
                </Form.Group>
    
                <Form.Group controlId='brand'>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId='countInStock'>
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter countInStock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
    
                <Button
                  type='submit'
                  variant='primary'
                  style={{ marginTop: '1rem' }}
                >
                  Update
                </Button>
              </Form>
            )}
        </FormContainer>
    </>
  )
}

export default ProductEditScreen