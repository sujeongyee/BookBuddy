import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ToastMsg = ({ prop }) => {
  const [prevProp, setPrevProp] = useState(null);

  useEffect(() => {
    toast.remove();
    switch (prop) {
      case 'success':
        toast.success('추천 게시글 작성 완료');
        break;
      case 'success2':
        toast.success('리뷰 게시글 작성 완료');
        break;
      case 'loginSuccess':
        toast.success('로그인 성공! 환영합니다');
        break;
      case 'addFollowSuccess':
        toast.success('팔로우 완료!');
        break;
      case 'cancelFollowSuccess':
        toast.success('언팔로우 완료!');
        break;
      case 'myPostLike':
        toast.error('내 게시글은 추천할 수 없습니다.');
        break;
      case 'doComment':
        toast.success('댓글 작성 완료!');
        break;
      case 'modifyRcm':
        toast.success('추천글 수정 완료!');
        break;
      case 'modifyRv':
        toast.success('리뷰글 수정 완료!');
        break;
      case 'deletePost':
        toast.success('게시글을 삭제했습니다.');
        break;
      case 'modifyComment':
        toast.success('댓글 수정 완료!');
        break;
      case 'deleteComment' :
        toast.success('댓글 삭제 완료!');
      default:
        break;
      
    }
    setPrevProp(prop); // 현재 prop을 prevProp으로 설정
  }, [prop, prevProp]);

  return <Toaster />;
};

export default ToastMsg;
