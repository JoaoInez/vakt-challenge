import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
} from "react";
import Select from "react-select";
import { getSymbolsNextAPI } from "api";
import { ListingFunctionT } from "types";
import styles from "./ListingForm.module.scss";

type Props = {
  listing?: {
    name?: string;
    description?: string;
    price?: string | number;
    currency?: string;
  };
  submitButtonLabel: string;
  onSubmitFn: ListingFunctionT;
  cancelBtn?: JSX.Element;
};

type CurrencyOption = {
  value: string | undefined;
  label: string | undefined;
};

const ListingForm = ({
  listing = {
    name: "",
    description: "",
    price: "",
    currency: "GBP",
  },
  submitButtonLabel,
  onSubmitFn,
  cancelBtn,
}: Props) => {
  const { name, description, price, currency } = listing;
  const [listingName, setName] = useState<string>(name as string);
  const [listingDescription, setDescription] = useState<string>(
    description as string
  );
  const [listingPrice, setPrice] = useState<string>(`${price}`);
  const [listingCurrency, setCurrency] = useState<CurrencyOption>({
    value: currency,
    label: currency,
  });
  const [symbols, setSymbols] = useState<CurrencyOption[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getSymbolsNextAPI();

      data.success &&
        setSymbols(
          Object.keys(data.symbols).map((symbol) => ({
            value: symbol,
            label: symbol,
          }))
        );
    })();
  }, []);

  const onChange = (setFunction: Dispatch<SetStateAction<string>>) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFunction(e.currentTarget.value);
  };

  const selectSymbol = (selectedSymbol: CurrencyOption) => {
    setCurrency(selectedSymbol);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const listing = {
      name: listingName,
      description: listingDescription,
      price: listingPrice,
      currency: listingCurrency.value as string,
    };

    onSubmitFn(listing);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="name"
        value={listingName}
        onChange={onChange(setName)}
        className={styles.name}
      />
      <textarea
        name="description"
        id="description"
        rows={5}
        placeholder="description..."
        value={listingDescription}
        onChange={onChange(setDescription)}
      ></textarea>
      <input
        type="text"
        name="price"
        id="price"
        placeholder="price"
        value={listingPrice}
        onChange={onChange(setPrice)}
        className={`${styles.price} ${
          isNaN(+listingPrice) ? styles.error : ""
        }`}
      />
      <Select
        value={listingCurrency}
        onChange={selectSymbol}
        options={symbols}
        className={styles.currency}
      />
      <div className={styles.btnContainer}>
        <input
          type="submit"
          value={submitButtonLabel}
          className="btn-primary"
          disabled={
            !listingName ||
            !listingPrice ||
            isNaN(+listingPrice) ||
            !listingCurrency.value
          }
        />
        {cancelBtn}
      </div>
    </form>
  );
};

export default ListingForm;
