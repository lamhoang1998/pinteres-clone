import { useQueryClient } from "@tanstack/react-query";
import { useUpdateImg } from "../../common/api/mutation/mutation";
import { useAuth } from "../../context/authContext";
import ImgForm from "../Form/ImgForm";
import { toast } from "react-toastify";

function EditImg() {
	const { imgDetails, toggleShowEdit } = useAuth();
	const queryClient = useQueryClient();

	console.log("img details", imgDetails);
	const updateImg = useUpdateImg();

	function handleUpdateImg(imgData: FormData) {
		const imgInfo: { imgId: number | undefined; updateImg: FormData } = {
			imgId: imgDetails?.imgId,
			updateImg: imgData,
		};
		updateImg.mutate(imgInfo, {
			onSuccess: () => {
				toggleShowEdit();
				queryClient.invalidateQueries({
					queryKey: ["imgDetails", imgInfo.imgId?.toString()],
				});
				toast.success("sucessfully updated the image");

				queryClient.invalidateQueries({ queryKey: ["pictures"] });
			},
		});
	}

	return <ImgForm onSave={handleUpdateImg} image={imgDetails} isEdit />;
}

export default EditImg;
