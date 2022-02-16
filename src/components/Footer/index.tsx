import s from './index.module.scss';

const Footer: React.FC = () => (
  <div className={s.footerBox}>
    <span>待办事项</span>
    <a href='https://beian.miit.gov.cn/' target='_blank' rel='noreferrer'>
      浙ICP备2020043821号-2
    </a>
  </div>
);

export default Footer;
