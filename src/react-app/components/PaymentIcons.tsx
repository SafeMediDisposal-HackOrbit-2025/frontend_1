
export function getPaymentIcon(id: string, className: string = "w-6 h-6") {
  switch (id) {
    case "googlepay":
      return (
        <img
          src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-pay-icon.png"
          alt="Google Pay"
          className={className}
        />
      );

    case "phonepe":
      return (
        <img
          src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-icon.png"
          alt="PhonePe"
          className={className}
        />
      );

    case "applepay":
      return (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
          alt="Apple Pay"
          className={className}
        />
      );

    case "paytm":
      return (
        <img
          src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/paytm-icon.png"
          alt="Paytm"
          className={className}
        />
      );

    default:
      return (
        <div
          className={`bg-gray-300 text-gray-700 flex items-center justify-center rounded ${className}`}
        >
          ?
        </div>
      );
  }
}
