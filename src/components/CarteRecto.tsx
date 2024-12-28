import Image from "next/image";

interface CarteRectoProps {
  recipientName: string;
}

export default function CarteRecto({ recipientName }: CarteRectoProps) {
  return (
    <div
      className="bg-gradient-to-b from-blue-100 via-blue-50 to-white border shadow-md p-4"
      style={{ width: "750px", height: "500px" }}
    >
      <div className="front-page flex flex-col items-center justify-between h-full">
        <h2 className="font-bold text-3xl text-[#2a6a9c] text-center">
          🎁 Bonne et heureuse année 2025 🎉
        </h2>
        <Image
          src="/images/yellow-flowers.png"
          width={230}
          height={230}
          alt="Photo de fleurs"
        />
        <p className="font-semibold text-xl text-gray-700 text-center">
          Offrez de la joie et des sourires ! <br />
          Une carte spéciale pour une personne spéciale : <br />
          <span className="text-[#2a6a9c] font-bold uppercase">
            {recipientName}
          </span>
        </p>
      </div>
    </div>
  );
}
