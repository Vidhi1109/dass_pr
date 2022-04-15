pragma solidity >=0.4.21 <0.7.0;
contract Manufacturer {
    address creator;
    struct product
    {
        uint hash;
        address _manufacturer;
        address[] owners;
        address current_owner;
        string _desc;
        uint quantity;
        uint price;
        uint no_of_transfers;
    }
    product[] public all_products; // Stores all the products 
    mapping (address => uint) public chain_products_track; // stores the length of all_product_track
    mapping (address => product[]) public all_products_track; // Stores the products a address have 
    uint public product_num;
    uint public test_track = 160;
    uint public index_tracker = 0;
    uint public found = 0;
    constructor() public 
    {
        product_num = 0;
    }
    function give_owners(address owner , uint hash , uint num) public returns (address)
    {
        for (uint i=0 ; i<chain_products_track[owner];i++)
        {
            if(all_products_track[owner][i].hash == hash)
            {
                return all_products_track[owner][i].owners[num];
            }
        }
    }

    function manufacturerCreatesProduct
    (
        address _manufacturerAddr,
        string memory _description,
        uint _quantity,
        uint cost,
        uint hash
        ) public {
        // require(_manufacturerAddr == msg.sender);
        product memory Product1 = product(hash, _manufacturerAddr ,new address[](10),_manufacturerAddr, _description , _quantity ,cost , 0);
        chain_products_track[_manufacturerAddr]++;
        all_products_track[_manufacturerAddr].push(product(hash, _manufacturerAddr ,new address[](10),_manufacturerAddr, _description , _quantity ,cost , 0));
        all_products.push(Product1);     
    }

    function manufacturerCreatesProduct2
    (
        address _from,
        address _to,
        uint i,
        address _manufacturerAddr,
        address current_owner,
        string memory _description,
        uint _quantity,
        uint cost,
        uint hash,
        uint no_of_transfers
        ) public {
        // require(_manufacturerAddr == msg.sender);
        all_products_track[_from][i].quantity = all_products_track[_from][i].quantity - _quantity;
        //product memory Product1 = product(hash, _manufacturerAddr ,new address[](10),_manufacturerAddr, _description , _quantity ,cost , 0);
        chain_products_track[_to]++;
        all_products_track[_to].push(product(hash, _manufacturerAddr ,new address[](10),current_owner, _description , _quantity ,cost , no_of_transfers));
        //all_products.push(Product1);     
    }

    function transferOwnership
    (
        address _from,
        address _to,
        uint hash,
        uint quantity
    ) public  returns (uint)
     
    {
        
        // require(_from == msg.sender);

        for (uint i=0 ; i< chain_products_track[_from] ; i++)
        {
            if(all_products_track[_from][i].hash == hash)
            {
                // If total number of product is less than number of products to be transferred
                if (all_products_track[_from][i].quantity < quantity)
                {
                    return 696969;
                }
                else
                {
                    // Will tell if the _to address already have this product
                    
                    found = 0;

                    // Update the quantity of product
                    all_products_track[_from][i].quantity = all_products_track[_from][i].quantity - quantity;

                    for (uint j=0 ; j< chain_products_track[_to] ; j++)
                    {
                        if (all_products_track[_to][j].hash == hash)
                        {
                            return j;
                            // all_products_track[_to][j].quantity = all_products_track[_to][j].quantity + quantity;
                            // all_products_track[_to][j].current_owner = _to;
                            // all_products_track[_to][j].no_of_transfers ++;
                        }
                    }
                    if (found == 0)
                    {
                        return i;
                        // return "not found";
                        // address x = _to ;

                        //product memory Product1 = product(hash, all_products_track[_from][i]._manufacturer ,all_products_track[_from][i].owners,all_products_track[_from][i].current_owner, all_products_track[_from][i]._desc , all_products_track[_from][i].quantity ,all_products_track[_from][i].price , all_products_track[_from][i].no_of_transfers); 
                        //all_products_track[_from].push(Product1);
                        // // all_products_track[_to][0] = Product1 ;
                        // //manufacturerCreatesProduct(_to, "chal jaa bsdk", quantity, 10, hash);
                        // //all_products_track[_to].push(product(hash, all_products_track[_from][i]._manufacturer ,new address[](10),all_products_track[_from][i].current_owner, all_products_track[_from][i]._desc , all_products_track[_from][i].quantity ,all_products_track[_from][i].price , all_products_track[_from][i].no_of_transfers));
                        // // all_products_track[_to].push(all_products_track[_from][i]);
                        //  //all_products_track[_to].push(product(all_products_track[_from][i].hash, all_products_track[_from][i]._manufacturer ,all_products_track[_from][i].owners,all_products_track[_from][i].current_owner, all_products_track[_from][i]._desc , all_products_track[_from][i].quantity ,all_products_track[_from][i].price , all_products_track[_from][i].no_of_transfers));
                        //  //all_products_track[_to].push(product(hash, all_products_track[_from][i]._manufacturer ,all_products_track[_from][i].owners,_from, "hola" , 4 ,0 , 0));
                        // // chain_products_track[_to]++;
                        // // all_products_track[_to][chain_products_track[_to]-1].quantity =  quantity;
                        // // all_products_track[_to][chain_products_track[_to]-1].owners.push(_to);
                        // // all_products_track[_to][chain_products_track[_to]-1].current_owner = _to;
                        // // all_products_track[_to][chain_products_track[_to]-1].no_of_transfers ++;                        
                    }
                }
            }
        }
        return 696970;

    }
}
