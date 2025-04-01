const StarIcon = ({ color = 'currentColor', className = '' }) => {
    return (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M7.55881 0.641809C7.64165 0.473983 7.81256 0.367737 7.99973 0.367737C8.18691 0.367704 8.35785 0.473951 8.44069 0.641777L10.3586 4.52732C10.539 4.89267 10.8875 5.14597 11.2908 5.20453L15.5789 5.82789C15.7642 5.85483 15.918 5.98455 15.9759 6.16256C16.0337 6.34055 15.9855 6.53597 15.8515 6.66663L12.7488 9.69142C12.457 9.97588 12.3239 10.3856 12.3927 10.7872L13.1248 15.0574C13.1564 15.2419 13.0806 15.4283 12.9292 15.5382C12.7778 15.6483 12.577 15.6627 12.4114 15.5756L8.57586 13.5596C8.21521 13.37 7.78435 13.37 7.42364 13.5597L3.58848 15.5756C3.4228 15.6627 3.22205 15.6481 3.07065 15.5382C2.91922 15.4281 2.84342 15.2417 2.87504 15.0573L3.60747 10.7874C3.67638 10.3857 3.54323 9.97588 3.2514 9.69135L0.148505 6.66666C0.0145037 6.536 -0.0337665 6.34058 0.0240798 6.1626C0.0819262 5.98461 0.235794 5.85489 0.421019 5.82792L4.70905 5.20459C5.11229 5.14597 5.46089 4.8927 5.64125 4.52729L7.55881 0.641809Z"
            fill={color}
          />
        </g>
      </svg>
    );
  };
  
  export default StarIcon;
  