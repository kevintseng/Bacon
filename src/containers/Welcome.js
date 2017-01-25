import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, H1 } from 'native-base';

export default class Welcome extends Component {
    render() {
        return (
          <Container>
              <Header>
                  <Title>Header</Title>
              </Header>

              <Content>
                  <H1>Hi</H1>
              </Content>

              <Footer>
                  <FooterTab>
                      <Button transparent>
                          <Icon name='ios-call' />
                      </Button>
                  </FooterTab>
              </Footer>
          </Container>
        );
    }
}
