import Modal from 'react-modal';
const FollowModal = ({ isOpen, onRequestClose, mode }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="follow-modal">
        <h2>{mode === 'follower' ? '팔로워' : '팔로잉'}</h2>
        <ul>
          {/* {followData.map((follow) => (
            <li key={follow.id}>{follow.name}</li>
          ))} */}
        </ul>
      </div>
    </Modal>
  );
}

export default FollowModal