import React, { useContext,useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { logoutFromFirebase, updateUserInfo,storeOrderId } from "../actions";
import { StoreContext } from "../store";
import {getOrderByUser} from "../api";
const ProfileCard = () => {
  const {
    state: {
      userSignin: { userInfo },
    },
    state: {orderId:{orderres}},
    state:{orderid},
    dispatch,
  } = useContext(StoreContext);
  console.log(orderid);
  const { displayName, email } = userInfo;
  const history = useHistory();
  const [form] = Form.useForm();

  const handleUpdate = (values) => {
    console.log(values)
    updateUserInfo(dispatch, values);
  };

  const handleLogout = () => {
    logoutFromFirebase(dispatch);
    history.push("/");
  };
  const checkorder = () => {
    let id=[];
    id=storeOrderId(dispatch);
    setopen(!open);
    console.log(id);
    // history.push("/placeorder");
  }
  const clickorderid=(id)=>{
    
    history.push("/order/"+id);
  }
  const [open,setopen]=useState(false);
  return (
    <Form
      onFinish={handleUpdate}
      name="normal_login"
      className="login-form"
      form={form}
      initialValues={userInfo}
    >
      <Form.Item
        label="name: "
        name="name"
        rules={[
          {
            type: "string",
            message: "The input is not valid name!",
          },
          {
            message: "Please input your name!",
          },
        ]}
        hasFeedback
      >
        <Input placeholder={displayName} />
      </Form.Item>
      <Form.Item
        label="email: "
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            message: "Please input your E-mail!",
          },
        ]}
        hasFeedback
      >
        <Input placeholder={email} />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="rePassword"
        label="Re-enter Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            message: "Please re-enter your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form__button"
        >
          Submit
        </Button>

        <Button
          type="danger"
          style={{ marginTop: "0.8rem" }}
          className="login-form__button"
          onClick={handleLogout}
        >
          Log out
        </Button>
        <Button
          type="primary"
          style={{ marginTop: "0.8rem" }}
          className="login-form__button"
          onClick={checkorder}
        >
          Check out my order
        </Button>
        {open
          ?(
            orderid.map((id)=>
              <Button onClick={()=>clickorderid(id)}>{id}</Button>
            )
            
          ):(
            <div></div>
          )
        }
      </Form.Item>
    </Form>
  );
};
export default ProfileCard;
