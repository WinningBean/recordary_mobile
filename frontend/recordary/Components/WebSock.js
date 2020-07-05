import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import Stomp from 'stompjs';
import SockJs from 'sockjs-client';

import axios from 'axios';

const WebSock = ({user, setChatData, setUser}) => {
  // const [client, setClient] = useState(null);

  // const setWebSock = (data) => {
  //   var sock = new SockJs(
  //     'http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/ws-stomp',
  //   );
  //   // var sock = new WebSocket(
  //   //   'http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/ws-stomp',
  //   // );
  //   var client = Stomp.over(sock);
  //   console.log('webpass');
  //   client.connect({}, function () {
  //     data.forEach((value) => {
  //       if (value.isGroup) {
  //         client.subscribe(
  //           `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/queue/chat/${value.roomCd}`,
  //           function (response) {
  //             console.log('response');
  //             console.log(JSON.parse(response.body));
  //             const draft = data.slice();
  //             const json = JSON.parse(response.body);
  //             const index = draft.findIndex(
  //               (object) => object.roomCd === value.roomCd,
  //             );
  //             if (draft[index].chatList === null) {
  //               console.log('draft');
  //             } else {
  //               draft[index].chatList.push(json);
  //             }
  //             ++draft[index].noticeCount;
  //             draft[index].lastChat = json.content;
  //             setInfo(draft);
  //           },
  //         );
  //       } else {
  //         client.subscribe(
  //           `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/topic/chat/${value.roomCd}`,
  //           function (response) {
  //             console.log('response');
  //             console.log(JSON.parse(response.body));
  //             const draft = data.slice();
  //             const json = JSON.parse(response.body);
  //             const index = draft.findIndex(
  //               (object) => object.roomCd === value.roomCd,
  //             );
  //             if (draft[index].chatList === null) {
  //               console.log('draft');
  //             } else {
  //               draft[index].chatList.push(json);
  //             }
  //             ++draft[index].noticeCount;
  //             draft[index].lastChat = json.content;
  //             setInfo(draft);
  //           },
  //         );
  //       }
  //     });
  //     setClient(client);
  //   });
  // };

  const getInfo = () => {
    axios
      .get(
        `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/room/list/${user.userCd}`,
      )
      .then(({data}) => {
        console.log(data, 'real data');
        setChatData(data);
        setUser(user);
        // setWebSock(data);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);
  return null;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WebSock);
