import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import Stomp from 'stompjs';
import SockJs from 'sockjs-client';

import axios from 'axios';

const WebSock = ({user, onSetChatData, onSaveNewChat}) => {
  var client = undefined;
  useEffect(() => {
    axios
      .get(
        `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/room/list/${user.userCd}`,
      )
      .then(({data}) => {
        onSetChatData(data.map((value) => ({...value, count: 0})));

        var sock = new SockJs(
          'http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/ws-stomp',
        );
        client = Stomp.over(sock);
        console.log('webpass');
        client.connect({}, function () {
          data.forEach((value, index) => {
            if (value.isGroup) {
              client.subscribe(`/queue/chat/${value.roomCd}`, function (
                response,
              ) {
                onSaveNewChat(JSON.parse(response.body), index);
              });
            } else {
              client.subscribe(`/topic/chat/${value.roomCd}`, function (
                response,
              ) {
                onSaveNewChat(JSON.parse(response.body), index);
              });
            }
          });
        });
      });
    return () => {
      console.log(client);
      if (client !== null && client.connected === true) {
        client.disconnect();
      }
    };
  }, []);

  return null;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetChatData: (chatData) => {
      dispatch({type: 'SET_CHATDATA', chatData: chatData});
    },
    onSaveNewChat: (newChat, index) => {
      dispatch({type: 'SAVE_NEWCHAT', newChat: newChat, newChatIndex: index});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebSock);
