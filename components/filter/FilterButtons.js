// Constants
import colors from "constants/colors";
import { PLAYERS_POSITIONS } from "constants/data/filters"
import Button from "components/html/Button";

export default function FilterButtons({
   activePosition,
    onClick
}) {

    return (
        <div>
            {
                PLAYERS_POSITIONS.map((position) => {
                    return (
                          <Button
                              title={position.label}
                              bg={ activePosition === position.label ? false : colors.lavender_grey}
                              bs={ activePosition === position.label}
                              fw={'600'}
                              fst={'normal'}
                              fs={16}
                              mr={10}
                              w={false}
                              h={false}
                              key={position.value}
                              br={12}
                              pl={12}
                              pr={12}
                              pt={8}
                              pb={8}
                              inline
                             onClick={() => onClick(position.value)}
                          />
                    )
                })
            }

        </div>
    )
}