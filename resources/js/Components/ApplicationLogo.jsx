export default function ApplicationLogo({ className }) {
  return (
    <img
      className={className}
      srcSet="../../asset/logo/logo_scale,w_200.png 200w,
      ../../asset/logo/logo_scale,w_478.png 478w,
      ../../asset/logo/logo_scale,w_674.png 674w,
      ../../asset/logo/logo_scale,w_783.png 783w"
      sizes="(max-width: 674px) 100vw, 674px"
      alt="Orbit Trust Logo"
      width={674}
      height={80}
    />
  );
}
