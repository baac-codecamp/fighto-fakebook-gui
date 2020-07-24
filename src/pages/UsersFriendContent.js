import React from 'react'
import { Avatar, Row, Col, Card, Typography, Button } from 'antd';
import axios from 'axios';

import HeaderFakeBook from '../components/HeaderFakeBook'

const { Title } = Typography;

let profileDetail = {
    image: "https://pbs.twimg.com/profile_images/1102083453984489472/xTOxzvEk_400x400.jpg",
    name: "Jennis BNK48"
  }

class UsersFriendContent extends React.Component {

  constructor(){    
    super();
    this.state = {
     user : null
    }
  }

  getUser = async () => {
    try {

      const config = {
        headers: { 
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMTkyNWY3YWQzYmE5YzM0ZDI2ZGUxYiIsImlhdCI6MTU5NTQ4MzcyMSwiZXhwIjoxNTk2MzQ3NzIxfQ.NsrGt948scGH3E8ZO7yfnxz_ZrJZz3M5e-1fA6sHQxY`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS', }
      };
      
      const bodyParameters = {
        email: 'wan.t@email.th'
      };

      const response = await axios.post('http://baac.topwork.asia:8445/api/user/list',
      bodyParameters,
      config
   )
      console.log(response.status)
      console.log(response.data)
      this.setState({
        user : response.data.data
      });
       
    } catch (err) {
      console.error(err)
    }
   }

   componentDidMount() {
    this.getUser();
  }

    render() {
      return (
        <>
        <HeaderFakeBook/>
          <Row>
            <Col span={18} offset={3}>
              <Card style={{marginTop:100}}>
                <Row>
                  <Col span={12}>
                    <Avatar round={true} size={200} alt={profileDetail.name} src={this.state.user && this.state.user.displayimage} /> 
                  </Col>
                  <Col span={12}>
                    <Title level={4}>{this.state.user && this.state.user.displayname}</Title> 
                    <span>{this.state.user && this.state.user.firstname} {this.state.user && this.state.user.lastname}</span>
                    <Button type="link" href="/edit">Edit Profile</Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>


          <Row>
            <Col span={18} offset={3} style={{marginTop:60}}>
                  <Title level={4}>friend List</Title><br/>
              <Card style={{marginTop:2}}>
                <Row>

                  {this.state.user && this.state.user.friends.map((friend) =>
                  <div>
                    <Avatar round={true} size={100} src={friend.profileimage}/> <Title level={4}>{friend.displayname}</Title>
                    </div>
                  )}
                </Row>
              </Card>
            </Col>
          </Row>
        </>
      )
    }
  }

export default UsersFriendContent