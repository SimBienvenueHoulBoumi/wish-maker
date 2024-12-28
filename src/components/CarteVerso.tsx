interface CarteVersoProps {
  recipientName: string;
  giftDescription: string;
  senderName: string;
}

export default function CarteVerso({
  recipientName,
  giftDescription,
  senderName,
}: CarteVersoProps) {
  return (
    <div
      className="bg-gradient-to-b from-blue-100 via-blue-50 to-white border shadow-md p-4"
      style={{ width: "750px", height: "500px" }}
    >
      <div className="back-page flex flex-col items-center justify-between h-full">
      <div className="text-center px-8">
          <h2 className="font-extrabold text-4xl text-[#2a6a9c]">
            🌟 Nos vœux chaleureux 🌟
          </h2>
          <p className="text-lg text-gray-600 leading-8 mt-4">
            Que cette année soit lumineuse, pleine de réussite et d’amour. 🌺
            <br />
            Offrez un cadeau de cœur, rempli de bonheur, de prospérité et de
            souvenirs inoubliables.
          </p>
        </div>
        <div className="rounded-md p-8 w-full">
          <p className="font-medium text-lg text-gray-800 text-center mt-4">
            ✨ Pour :
            <br />
            <span className="font-bold text-gray-700">{recipientName}</span>
          </p>
          <p className="font-medium text-lg text-gray-800 text-center mt-4">
            ✨ Message :
            <br />
            <span className="font-bold text-gray-700 break-words p-4">
              {giftDescription}
            </span>
          </p>
          <p className="font-medium text-lg text-gray-800 text-center mt-4">
            ✨ De :
            <br />
            <span className="font-bold text-gray-700">{senderName}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
