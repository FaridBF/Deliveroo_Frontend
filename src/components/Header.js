import logo from '../assets/deliveroo-images/logo-teal.svg';

const Header = () => {
  return (
    <>
      <div className='topBar'>
        <div className='topBar-center'>
          <img className='logo' src={logo} alt='logo deliveroo' />
        </div>
      </div>
    </>
  );
};

export default Header;
