interface FormProps {
  recipientName: string;
  giftDescription: string;
  senderName: string;
  setRecipientName: (name: string) => void;
  setGiftDescription: (description: string) => void;
  setSenderName: (name: string) => void;
  onValidate: () => void;
  initialRecipientName: string; // Ajout des valeurs initiales pour la comparaison
  initialGiftDescription: string;
  initialSenderName: string;
}

export default function Formulaire({
  recipientName,
  giftDescription,
  senderName,
  setRecipientName,
  setGiftDescription,
  setSenderName,
  onValidate,
  initialRecipientName,
  initialGiftDescription,
  initialSenderName,
}: FormProps) {

  // Fonction pour gérer la validation du nombre de mots
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: "recipient" | "gift" | "sender"
  ) => {
    const newValue = event.target.value;
    const wordCount = newValue.split(/\s+/).filter(Boolean).length;  // Compte les mots

    // Limiter les mots pour chaque champ
    const maxWords = type === "gift" ? 15 : 10; // Par exemple 15 mots max pour giftDescription, 10 mots max pour recipientName et senderName

    if (wordCount <= maxWords) {
      if (type === "recipient") {
        setRecipientName(newValue);
      } else if (type === "gift") {
        setGiftDescription(newValue);
      } else if (type === "sender") {
        setSenderName(newValue);
      }
    }
  };

  // Fonction qui vérifie si tous les champs ont été modifiés par rapport à leur valeur initiale
  const isFormValid = () => {
    return (
      recipientName !== initialRecipientName ||
      giftDescription !== initialGiftDescription ||
      senderName !== initialSenderName
    );
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg mt-8 w-96">
      <h2 className="font-bold text-2xl text-center text-gray-700 mb-6">
        Personnalisez votre carte
      </h2>
      <form className="flex flex-col space-y-4">
        <label className="flex flex-col">
          <span className="font-semibold text-gray-600">
            Nom du destinataire (max 10 mots) :
          </span>
          <input
            maxLength={20}
            value={recipientName}
            onChange={(e) => handleDescriptionChange(e, "recipient")}
            className="border border-gray-300 p-2 rounded shadow-sm resize-none"
            type="text"
            placeholder="Entrez le nom du destinataire"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-semibold text-gray-600">
            Message venant avec cadeau (max 250 mots) :
          </span>
          <textarea
            maxLength={250}
            value={giftDescription}
            onChange={(e) => handleDescriptionChange(e, "gift")}
            className="border border-gray-300 p-2 rounded shadow-sm resize-none"
            rows={4}
            placeholder="Entrez votre message"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-semibold text-gray-600">
            Nom de l&apos;expéditeur (max 15 lettres) :
          </span>
          <input
            value={senderName}
            maxLength={15}
            onChange={(e) => handleDescriptionChange(e, "sender")}
            className="border border-gray-300 p-2 rounded shadow-sm resize-none"
            type="text"
            placeholder="Entrez le nom de l'expéditeur"
          />
        </label>
      </form>
      <div className="mt-6 flex justify-center">
        <button
          onClick={onValidate}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded ${!isFormValid() ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!isFormValid()} // Désactiver le bouton si le formulaire n'est pas valide
        >
          Valider
        </button>
      </div>
    </div>
  );
}
