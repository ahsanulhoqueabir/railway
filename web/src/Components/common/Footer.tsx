import getImage from "../../utilities/getimage";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="flex justify-between items-center border-t-[3.5px] border-green-500 p-10 bg-[#f6f9ff]  px-5 lg:px-20">
      <nav>
        <p>
          &copy; {year} <span className="font-bold">Ahsanul Hoque</span>. All
          rights reserved.
        </p>
      </nav>
      <nav>
        <p>Terms and Conditions | Privacy Policy</p>
      </nav>
      <nav>
        <div className="flex items-center">
          <img
            className="size-16"
            src={getImage("common", "logo.png")}
            alt=""
          />
          <p className="font-bold text-[#da934f]">
            Bangladesh <br></br> Railway
          </p>
        </div>
        <p>নিরাপদ . আরামদায়ক . সাশ্রয়ী</p>
      </nav>
    </footer>
  );
};

export default Footer;
