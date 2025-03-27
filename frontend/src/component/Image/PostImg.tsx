import { toast } from "react-toastify";
import { useUploadImg } from "../../common/api/mutation/mutation";
import ImgForm from "../Form/ImgForm";
import { useQueryClient } from "@tanstack/react-query";

function PostImg() {
	const uploadImg = useUploadImg();

	const queryClient = useQueryClient();

	function handleUpload(imgFormData: FormData) {
		uploadImg.mutate(imgFormData, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["pictures"] });
				toast.success("successfully uploaded new img");
			},
		});
	}

	return <ImgForm onSave={handleUpload} />;
}

export default PostImg;
